using UnityEngine;
using NeuralCollapse.Core;

namespace NeuralCollapse.Network
{
    /// <summary>
    /// Main network manager - handles API calls and socket connections
    /// </summary>
    public class NetworkManager : MonoBehaviour
    {
        [Header("References")]
        [SerializeField] private APIClient apiClient;
        [SerializeField] private SocketClient socketClient;

        [Header("Settings")]
        [SerializeField] private bool autoConnect = true;

        private void Awake()
        {
            if (apiClient == null) apiClient = gameObject.AddComponent<APIClient>();
            if (socketClient == null) socketClient = gameObject.AddComponent<SocketClient>();
        }

        private void Start()
        {
            EventBus.Subscribe("player:dataLoaded", OnPlayerDataLoaded);
            EventBus.Subscribe("player:logout", OnPlayerLogout);
        }

        private void OnDestroy()
        {
            EventBus.Unsubscribe("player:dataLoaded", OnPlayerDataLoaded);
            EventBus.Unsubscribe("player:logout", OnPlayerLogout);
        }

        public void Register(string username, string email, string password)
        {
            StartCoroutine(apiClient.Register(username, email, password,
                onSuccess: (response) =>
                {
                    Debug.Log($"Registration successful: {response.player.username}");
                    HandleAuthSuccess(response);
                },
                onError: (error) =>
                {
                    Debug.LogError($"Registration failed: {error}");
                    EventBus.Publish("auth:registrationFailed", error);
                }
            ));
        }

        public void Login(string email, string password)
        {
            StartCoroutine(apiClient.Login(email, password,
                onSuccess: (response) =>
                {
                    Debug.Log($"Login successful: {response.player.username}");
                    HandleAuthSuccess(response);
                },
                onError: (error) =>
                {
                    Debug.LogError($"Login failed: {error}");
                    EventBus.Publish("auth:loginFailed", error);
                }
            ));
        }

        private void HandleAuthSuccess(AuthResponse response)
        {
            // Set player data in GameManager
            GameManager.Instance.SetPlayerData(
                response.player.id,
                response.player.username,
                response.player.level,
                response.player.xp
            );

            // Set resources
            var resourceManager = FindObjectOfType<NeuralCollapse.Resources.ResourceManager>();
            if (resourceManager != null)
            {
                resourceManager.SetResources(
                    response.player.resources.energyCores,
                    response.player.resources.nanobots,
                    response.player.resources.scrapMetal,
                    response.player.resources.dataChips
                );
            }

            EventBus.Publish("auth:success", response);

            // Load main game scene
            UnityEngine.SceneManagement.SceneManager.LoadScene("Base");
        }

        private void OnPlayerDataLoaded(object data)
        {
            if (autoConnect && socketClient != null)
            {
                // Connect to real-time socket
                socketClient.Connect();
            }
        }

        private void OnPlayerLogout(object data)
        {
            if (socketClient != null)
            {
                socketClient.Disconnect();
            }
        }
    }
}
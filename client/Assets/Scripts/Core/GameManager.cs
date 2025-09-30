using UnityEngine;

namespace NeuralCollapse.Core
{
    /// <summary>
    /// Main game manager - singleton that manages game state and core systems
    /// </summary>
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance { get; private set; }

        [Header("References")]
        [SerializeField] private NetworkManager networkManager;
        [SerializeField] private ResourceManager resourceManager;
        [SerializeField] private BaseManager baseManager;
        [SerializeField] private HeroManager heroManager;

        [Header("Game State")]
        public string PlayerId { get; private set; }
        public string PlayerUsername { get; private set; }
        public int PlayerLevel { get; private set; }
        public int PlayerXP { get; private set; }

        public bool IsAuthenticated { get; private set; }
        public bool IsInitialized { get; private set; }

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
            }
            else
            {
                Destroy(gameObject);
            }
        }

        private void Start()
        {
            InitializeGame();
        }

        private void InitializeGame()
        {
            Debug.Log("Initializing Neural Collapse...");

            // Initialize core systems
            EventBus.Initialize();

            // TODO: Load saved data
            // TODO: Check auto-login

            IsInitialized = true;
            EventBus.Publish("game:initialized");
        }

        public void SetPlayerData(string id, string username, int level, int xp)
        {
            PlayerId = id;
            PlayerUsername = username;
            PlayerLevel = level;
            PlayerXP = xp;
            IsAuthenticated = true;

            EventBus.Publish("player:dataLoaded", new { id, username, level, xp });
        }

        public void Logout()
        {
            IsAuthenticated = false;
            PlayerId = null;
            PlayerUsername = null;

            // Clear all data
            resourceManager?.ClearResources();
            heroManager?.ClearHeroes();

            EventBus.Publish("player:logout");

            // Return to login screen
            UnityEngine.SceneManagement.SceneManager.LoadScene("MainMenu");
        }

        private void OnApplicationQuit()
        {
            // Save game state
            Debug.Log("Saving game state...");
        }

        private void OnApplicationPause(bool pauseStatus)
        {
            if (pauseStatus)
            {
                // Game paused - save state
                Debug.Log("Game paused - saving state");
            }
        }
    }
}
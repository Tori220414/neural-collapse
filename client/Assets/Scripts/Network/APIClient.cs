using System;
using System.Collections;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;

namespace NeuralCollapse.Network
{
    /// <summary>
    /// HTTP API client for REST calls to backend
    /// </summary>
    public class APIClient : MonoBehaviour
    {
        private const string BASE_URL = "http://localhost:3000/api";

        private string accessToken;

        public void SetAccessToken(string token)
        {
            accessToken = token;
        }

        /// <summary>
        /// Register new player
        /// </summary>
        public IEnumerator Register(string username, string email, string password,
            Action<AuthResponse> onSuccess, Action<string> onError)
        {
            var requestData = new
            {
                username,
                email,
                password
            };

            string json = JsonUtility.ToJson(requestData);

            using (UnityWebRequest request = new UnityWebRequest($"{BASE_URL}/auth/register", "POST"))
            {
                byte[] bodyRaw = Encoding.UTF8.GetBytes(json);
                request.uploadHandler = new UploadHandlerRaw(bodyRaw);
                request.downloadHandler = new DownloadHandlerBuffer();
                request.SetRequestHeader("Content-Type", "application/json");

                yield return request.SendWebRequest();

                if (request.result == UnityWebRequest.Result.Success)
                {
                    string responseText = request.downloadHandler.text;
                    AuthResponse response = JsonUtility.FromJson<AuthResponse>(responseText);

                    SetAccessToken(response.tokens.accessToken);
                    onSuccess?.Invoke(response);
                }
                else
                {
                    string error = request.downloadHandler.text;
                    Debug.LogError($"Registration failed: {error}");
                    onError?.Invoke(error);
                }
            }
        }

        /// <summary>
        /// Login player
        /// </summary>
        public IEnumerator Login(string email, string password,
            Action<AuthResponse> onSuccess, Action<string> onError)
        {
            var requestData = new
            {
                email,
                password
            };

            string json = JsonUtility.ToJson(requestData);

            using (UnityWebRequest request = new UnityWebRequest($"{BASE_URL}/auth/login", "POST"))
            {
                byte[] bodyRaw = Encoding.UTF8.GetBytes(json);
                request.uploadHandler = new UploadHandlerRaw(bodyRaw);
                request.downloadHandler = new DownloadHandlerBuffer();
                request.SetRequestHeader("Content-Type", "application/json");

                yield return request.SendWebRequest();

                if (request.result == UnityWebRequest.Result.Success)
                {
                    string responseText = request.downloadHandler.text;
                    AuthResponse response = JsonUtility.FromJson<AuthResponse>(responseText);

                    SetAccessToken(response.tokens.accessToken);
                    onSuccess?.Invoke(response);
                }
                else
                {
                    string error = request.downloadHandler.text;
                    Debug.LogError($"Login failed: {error}");
                    onError?.Invoke(error);
                }
            }
        }

        /// <summary>
        /// Generic GET request with authentication
        /// </summary>
        public IEnumerator Get(string endpoint, Action<string> onSuccess, Action<string> onError)
        {
            using (UnityWebRequest request = UnityWebRequest.Get($"{BASE_URL}{endpoint}"))
            {
                if (!string.IsNullOrEmpty(accessToken))
                {
                    request.SetRequestHeader("Authorization", $"Bearer {accessToken}");
                }

                yield return request.SendWebRequest();

                if (request.result == UnityWebRequest.Result.Success)
                {
                    onSuccess?.Invoke(request.downloadHandler.text);
                }
                else
                {
                    Debug.LogError($"GET {endpoint} failed: {request.error}");
                    onError?.Invoke(request.error);
                }
            }
        }

        /// <summary>
        /// Generic POST request with authentication
        /// </summary>
        public IEnumerator Post(string endpoint, string jsonData,
            Action<string> onSuccess, Action<string> onError)
        {
            using (UnityWebRequest request = new UnityWebRequest($"{BASE_URL}{endpoint}", "POST"))
            {
                byte[] bodyRaw = Encoding.UTF8.GetBytes(jsonData);
                request.uploadHandler = new UploadHandlerRaw(bodyRaw);
                request.downloadHandler = new DownloadHandlerBuffer();
                request.SetRequestHeader("Content-Type", "application/json");

                if (!string.IsNullOrEmpty(accessToken))
                {
                    request.SetRequestHeader("Authorization", $"Bearer {accessToken}");
                }

                yield return request.SendWebRequest();

                if (request.result == UnityWebRequest.Result.Success)
                {
                    onSuccess?.Invoke(request.downloadHandler.text);
                }
                else
                {
                    Debug.LogError($"POST {endpoint} failed: {request.error}");
                    onError?.Invoke(request.error);
                }
            }
        }
    }

    // Data classes
    [Serializable]
    public class AuthResponse
    {
        public PlayerData player;
        public TokenData tokens;
    }

    [Serializable]
    public class PlayerData
    {
        public string id;
        public string username;
        public string email;
        public int level;
        public int xp;
        public ResourceData resources;
    }

    [Serializable]
    public class ResourceData
    {
        public int energyCores;
        public int nanobots;
        public int scrapMetal;
        public int dataChips;
    }

    [Serializable]
    public class TokenData
    {
        public string accessToken;
        public string refreshToken;
    }
}
using UnityEngine;
using NeuralCollapse.Core;

namespace NeuralCollapse.Resources
{
    /// <summary>
    /// Manages player resources (Energy Cores, Nanobots, Scrap Metal, Data Chips)
    /// </summary>
    public class ResourceManager : MonoBehaviour
    {
        [Header("Current Resources")]
        public int EnergyCores;
        public int Nanobots;
        public int ScrapMetal;
        public int DataChips;

        [Header("Storage Capacity")]
        public int EnergyCoresCapacity = 10000;
        public int NanobotsCapacity = 5000;
        public int ScrapMetalCapacity = 5000;
        public int DataChipsCapacity = 1000;

        private void Start()
        {
            EventBus.Subscribe("resources:update", OnResourcesUpdated);
        }

        private void OnDestroy()
        {
            EventBus.Unsubscribe("resources:update", OnResourcesUpdated);
        }

        /// <summary>
        /// Set resources from server data
        /// </summary>
        public void SetResources(int energyCores, int nanobots, int scrapMetal, int dataChips)
        {
            EnergyCores = energyCores;
            Nanobots = nanobots;
            ScrapMetal = scrapMetal;
            DataChips = dataChips;

            EventBus.Publish("resources:changed");
            UpdateUI();
        }

        /// <summary>
        /// Add resources
        /// </summary>
        public bool AddResource(ResourceType type, int amount)
        {
            switch (type)
            {
                case ResourceType.EnergyCores:
                    EnergyCores = Mathf.Min(EnergyCores + amount, EnergyCoresCapacity);
                    break;
                case ResourceType.Nanobots:
                    Nanobots = Mathf.Min(Nanobots + amount, NanobotsCapacity);
                    break;
                case ResourceType.ScrapMetal:
                    ScrapMetal = Mathf.Min(ScrapMetal + amount, ScrapMetalCapacity);
                    break;
                case ResourceType.DataChips:
                    DataChips = Mathf.Min(DataChips + amount, DataChipsCapacity);
                    break;
            }

            EventBus.Publish("resources:changed");
            UpdateUI();
            return true;
        }

        /// <summary>
        /// Spend resources
        /// </summary>
        public bool SpendResources(int energyCores, int nanobots, int scrapMetal, int dataChips)
        {
            // Check if we have enough
            if (EnergyCores < energyCores || Nanobots < nanobots ||
                ScrapMetal < scrapMetal || DataChips < dataChips)
            {
                Debug.LogWarning("Insufficient resources!");
                EventBus.Publish("resources:insufficient");
                return false;
            }

            // Deduct resources
            EnergyCores -= energyCores;
            Nanobots -= nanobots;
            ScrapMetal -= scrapMetal;
            DataChips -= dataChips;

            EventBus.Publish("resources:changed");
            UpdateUI();
            return true;
        }

        public bool HasEnoughResources(int energyCores, int nanobots, int scrapMetal, int dataChips)
        {
            return EnergyCores >= energyCores && Nanobots >= nanobots &&
                   ScrapMetal >= scrapMetal && DataChips >= dataChips;
        }

        public void ClearResources()
        {
            EnergyCores = 0;
            Nanobots = 0;
            ScrapMetal = 0;
            DataChips = 0;
            UpdateUI();
        }

        private void OnResourcesUpdated(object data)
        {
            // Handle resource updates from server
            UpdateUI();
        }

        private void UpdateUI()
        {
            // Update UI elements
            EventBus.Publish("ui:updateResources");
        }
    }

    public enum ResourceType
    {
        EnergyCores,
        Nanobots,
        ScrapMetal,
        DataChips
    }
}
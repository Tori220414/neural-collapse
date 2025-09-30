using System;
using System.Collections.Generic;
using UnityEngine;

namespace NeuralCollapse.Core
{
    /// <summary>
    /// Simple event bus for decoupled communication between systems
    /// </summary>
    public static class EventBus
    {
        private static Dictionary<string, List<Action<object>>> events = new Dictionary<string, List<Action<object>>>();

        public static void Initialize()
        {
            events.Clear();
            Debug.Log("EventBus initialized");
        }

        /// <summary>
        /// Subscribe to an event
        /// </summary>
        public static void Subscribe(string eventName, Action<object> callback)
        {
            if (!events.ContainsKey(eventName))
            {
                events[eventName] = new List<Action<object>>();
            }

            events[eventName].Add(callback);
        }

        /// <summary>
        /// Unsubscribe from an event
        /// </summary>
        public static void Unsubscribe(string eventName, Action<object> callback)
        {
            if (events.ContainsKey(eventName))
            {
                events[eventName].Remove(callback);
            }
        }

        /// <summary>
        /// Publish an event
        /// </summary>
        public static void Publish(string eventName, object data = null)
        {
            if (events.ContainsKey(eventName))
            {
                foreach (var callback in events[eventName])
                {
                    try
                    {
                        callback?.Invoke(data);
                    }
                    catch (Exception e)
                    {
                        Debug.LogError($"Error in event callback for {eventName}: {e.Message}");
                    }
                }
            }
        }

        /// <summary>
        /// Clear all event subscriptions
        /// </summary>
        public static void Clear()
        {
            events.Clear();
        }
    }
}
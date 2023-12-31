import { Device } from '@/models/devices';
import { create } from 'zustand';

export interface SettingsState {
  /**
   * Whether the power backup is enabled.
   */
  isPowerBackupEnabled: boolean;
  /**
   * The current battery charge in percents.
   * Must be in range from 0 to 100.
   */
  batteryCharge: number;
  /**
   * The list of devices.
   */
  devices: Device[];
  /**
   * Sets the settings.
   * @param settings The settings to set.
   * @returns void
   */
  setSettings: (
    settings: Partial<Omit<SettingsState, 'setSettings' | 'batteryCharge'>>
  ) => void;
  /**
   * Sets the battery charge.
   * @param batteryCharge The battery charge to set.
   * @returns void
   * @throws Error if the battery charge is not in range from 0 to 100.
   */
  setBatteryCharge: (batteryCharge: number) => void;
}

export const settingsStore = create<SettingsState>()(set => ({
  isPowerBackupEnabled: true,
  batteryCharge: 100,
  devices: [
    { name: 'Wi-Fi роутер', status: 'on' },
    { name: 'Медіа конвертер', status: 'off' },
  ],
  setSettings: settings => set(settings),
  setBatteryCharge: batteryCharge => {
    if (batteryCharge < 0 || batteryCharge > 100) {
      throw new Error('Battery charge must be in range from 0 to 100');
    }
    set({ batteryCharge });
  },
}));

export const useSettingsStore = settingsStore;
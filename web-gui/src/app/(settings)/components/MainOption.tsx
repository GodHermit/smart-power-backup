'use client';

import { SettingsGroup } from '@/components/UI/Settings/SettingsGroup';
import { SettingsOption } from '@/components/UI/Settings/SettingsOption';
import { Switch } from '@nextui-org/switch';
import { useSettingsStore } from '../store/settingsStore';

export function MainOption() {
  const [isPowerBackupEnabled, setSettings] = useSettingsStore(state => [
    state.isPowerBackupEnabled,
    state.setSettings,
  ]);

  return (
    <SettingsGroup>
      <SettingsOption
        as="label"
        isActive={isPowerBackupEnabled}
        className="cursor-pointer"
      >
        Резервне живлення
        <Switch
          className="ml-auto"
          isSelected={isPowerBackupEnabled}
          classNames={{ base: 'h-full', wrapper: 'm-0' }}
          onChange={() =>
            setSettings({ isPowerBackupEnabled: !isPowerBackupEnabled })
          }
        />
      </SettingsOption>
    </SettingsGroup>
  );
}

export type Status = 'on' | 'off';

export interface Device {
  name: string;
  status: Status;
}

export const getDeviceStatusMessage = (device: Device) => {
  if (device.status === 'on') {
    return 'Працює';
  }

  // TODO: Add support for other statuses

  return 'Вимкнено';
};

import {
  createChannel,
  Importance,
  Visibility,
} from '@tauri-apps/plugin-notification';

await createChannel({
  id: 'reminder',
  name: 'PollyReminders',
  description: 'Notifications for the Polly reminders',
  importance: Importance.High,
  visibility: Visibility.Private,
  lights: true,
  lightColor: '#00A8E8',
  vibration: true,
  sound: 'bingbong',
});

console.log("Channel created!");

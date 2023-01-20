async function sendPushNotification(
  expoPushToken: string,
  title: string,
  messageStr: string
) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: messageStr,
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export default sendPushNotification;

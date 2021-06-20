export const alertWorkoutUtils = (): any => {
  const speakApi = new SpeechSynthesisUtterance();

  const speakMessage = (msg: string): void => {
    speakApi.text = msg;
    window.speechSynthesis.speak(speakApi);
  };

  return {
    speakMessage,
  };
};

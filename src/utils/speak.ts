import { ActivateVoiceFeecback } from '@/shared/constants';

export const alertWorkoutUtils = (): any => {
  const speakApi = new SpeechSynthesisUtterance();

  const speakMessage = (msg: string): void => {
    speakApi.text = msg;
    if (ActivateVoiceFeecback) {
      window.speechSynthesis.speak(speakApi);
    }
  };

  return {
    speakMessage,
  };
};

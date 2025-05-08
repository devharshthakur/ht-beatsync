interface TimeFormat {
  minutes: string;
  seconds: string;
  milliseconds: string;
}

/**
 * Formats a given time in milliseconds into a string representation of minutes, seconds, and milliseconds.
 *
 * @param {number} timeMs - The time in milliseconds to format.
 * @returns {string} A formatted time string in the format "MM:SS:MS".
 *
 * @example
 * // returns "01:02:003"
 * formatTimeMicro(62003);
 */
export const formatTimeMicro = (timeMs: number): string => {
  const milliseconds = Math.floor(timeMs) % 1000;
  const seconds = Math.floor(timeMs / 1000) % 60;
  const minutes = Math.floor(timeMs / 60000);

  const completeTimeObj: TimeFormat = {
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
    milliseconds: milliseconds.toString().padStart(2, '0'), // Adjusted to pad milliseconds to 3 digits
  };

  const completeTimeString: string = `${completeTimeObj.minutes}:${completeTimeObj.seconds}:${completeTimeObj.milliseconds}`;
  return completeTimeString;
};

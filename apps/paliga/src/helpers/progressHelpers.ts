/** progress에 따른 start, end 사이의 진행도를 반환 */
export const getProgress = (start: number, end: number, value: number) => {
  return (value - start) / (end - start);
};

/** progress에 따른 값을 계산 */
export const getProgressValue = (
  fromValue?: number,
  value?: number,
  progress: number = 0,
  isReverse = false,
) => {
  if (value === undefined && fromValue === undefined) {
    return;
  }
  if (fromValue !== undefined && value === undefined) {
    return fromValue;
  }
  if (fromValue === value) {
    return value;
  }

  const newFromValue = fromValue ?? 0;
  const newValue = value ?? 0;

  if (isReverse) {
    return (newValue - newFromValue) * -progress + newFromValue;
  }

  return (newValue - newFromValue) * progress + newFromValue;
};

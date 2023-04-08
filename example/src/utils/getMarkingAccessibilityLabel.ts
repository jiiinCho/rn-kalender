type LabelOptions = {
  accessibilityLabel?: string;
  isSelected: boolean;
  isStartDay: boolean;
  isPeriod: boolean;
  isEndDay: boolean;
  isDisabled: boolean;
  isBlocked: boolean;
};

export const getMarkingAccessibilityLabel = (options: LabelOptions) => {
  const { accessibilityLabel, isSelected, isStartDay, isEndDay, isPeriod, isDisabled, isBlocked } =
    options;

  if (accessibilityLabel) {
    return accessibilityLabel;
  }

  let label = '';
  if (isSelected) {
    label += 'selected ';
  }

  if (isStartDay) {
    label += 'period start ';
  }

  if (isEndDay) {
    label += 'period end ';
  }

  if (isPeriod) {
    label += 'period ';
  }

  if (isBlocked) {
    label += 'blocked ';
  }

  if (isDisabled) {
    label += 'disabled ';
  }

  return label;
};

import Header from '@/components/Header';
import { Text, useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Dispatch, SetStateAction } from 'react';
export default function CustomPicker({
  selectedIssueType,
  setSelectedIssueType,
  pickerValue,
}: {
  selectedIssueType: string | undefined;
  setSelectedIssueType: Dispatch<SetStateAction<string>>;
  pickerValue: string[];
}) {
  const theme = useTheme();
  return (
    <Picker
      mode='dialog'
      dropdownIconColor={theme.colors.primary}
      style={{
        backgroundColor: 'white',
      }}
      selectedValue={selectedIssueType}
      onValueChange={(itemValue) => setSelectedIssueType(itemValue)}>
      {pickerValue.map((item) => (
        <Picker.Item
          label={item}
          value={item}
          key={item}
        />
      ))}
    </Picker>
  );
}

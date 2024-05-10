import Header from '@/components/Header';
import { useState } from 'react';
import CustomPicker from '@/components/CustomPicker';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';
import CustomButton from '@/components/CustomButton';

const reportType: string[] = [
  'Waste Management',
  'Cleaning personnel',
  'Infrastructure',
  'Others',
];

const annoynmous: string[] = ['Be Visible', 'Annonymous'];

export default function Report() {
  const [location, setLocation] = useState('');
  const [selectedIssueType, setSelectedIssueType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Header title={'Report'} />
      <View
        style={{
          height: 520,
          justifyContent: 'space-between',
          padding: 24,
        }}>
        <CustomPicker
          selectedIssueType={selectedIssueType}
          setSelectedIssueType={setSelectedIssueType}
          pickerValue={annoynmous}
        />
        <CustomPicker
          selectedIssueType={selectedIssueType}
          setSelectedIssueType={setSelectedIssueType}
          pickerValue={reportType}
        />
        <TextInput
          onChangeText={(text) => setLocation(text)}
          mode='outlined'
          placeholder='Location'
          value={location}
          keyboardType='default'
          style={{ marginVertical: 12 }}
        />
        <TextInput
          onChangeText={(text) => setDescription(text)}
          mode='outlined'
          placeholder='Description'
          value={description}
          keyboardType='default'
          style={{
            paddingRight: 10,
            flex: 2,
            textAlignVertical: 'top',
          }}
        />
        <CustomButton
          loading={loading}
          actionName='Submit report'
        />
      </View>
    </>
  );
}

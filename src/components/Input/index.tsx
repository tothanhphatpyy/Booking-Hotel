import React from 'react';
import {TextInput, TextInputProps, StyleSheet} from 'react-native';
import {
  useController,
  Control,
  ControllerProps,
  useForm,
} from 'react-hook-form';
import {Controller, RegisterOptions} from 'react-hook-form';
import {Container} from '../Container';
import {COLORS} from '@src/config/theme/colors';
import {TextStories} from '../TextStories';

interface InputProps extends TextInputProps {
  name: string;
  control?: Control;
  label?: string;
  rules?: RegisterOptions;
  errors?: string;
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  control,
  rules,
  ...props
}) => {
  // const {field} = useController({name, rules});
  return (
    <Container margin={[0, 0, 16, 0]}>
      <Container flexDirection="row">
        <TextStories padding={[0, 0, 5, 10]}>{label}</TextStories>
        {rules?.required && (
          <TextStories
            textAlign="center"
            margin={[0, 0, 0, 5]}
            fontSize={16}
            color="RED_300">
            *
          </TextStories>
        )}
      </Container>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        rules={rules}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <Container
              padding={10}
              style={[
                styles.boxInput,
                {borderColor: error ? COLORS.RED_300 : COLORS.BG_300},
              ]}>
              <TextInput
                {...props}
                onChangeText={onChange}
                placeholder={props.placeholder || 'Vui lòng nhập dữ liệu'}
                onBlur={onBlur}
                value={value}
              />
            </Container>

            {error && (
              <TextStories fontSize={12} margin={[5, 0, 0, 10]} color="RED_300">
                {error?.message}
              </TextStories>
            )}
          </>
        )}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  boxInput: {
    borderWidth: 1,
    borderColor: COLORS.BG_300,
    borderRadius: 7,
  },
});

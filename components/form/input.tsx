import { Control, FieldPath, FieldValues, Path, useController } from "react-hook-form";
import { HelperText, TextInput, TextInputProps } from "react-native-paper"

interface ITextInputFieldProps<T extends FieldValues> extends TextInputProps {
    name: FieldPath<T>;
    control: Control<T>;
}
export const TextInputField = <T extends FieldValues,>(props: ITextInputFieldProps<T>) => {
    const controlledInput = useController({
        control: props.control,
        name: props.name
    });
    return (
        <>
            <TextInput error={!!controlledInput.fieldState.error} {...controlledInput.field} onEndEditing={controlledInput.field.onBlur} onChangeText={controlledInput.field.onChange} {...props} contentStyle={{ direction: "rtl", textAlign: "right" }} />
            <HelperText type="error">
                {controlledInput.fieldState.error?.message}
            </HelperText>
        </>
    )
}
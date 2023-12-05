import { IResourceComponentsProps } from "@refinedev/core";
import {
  Create as CreateForm,
  Edit as EditForm,
  useForm,
} from "@refinedev/mantine";
import { NumberInput, TextInput, Text } from "@mantine/core";
import { ProducerSelect } from "../../components/index.js";
import { WineTypeSelect } from "../../components/index.js";
import { RetailerSelect } from "../../components/index.js";

interface IProps extends IResourceComponentsProps {
  create?: boolean;
}

export const BottleCreateEdit: React.FC<IProps> = ({ create }) => {
  const { getInputProps, saveButtonProps, errors } = useForm({
    initialValues: {
      name: "",
      price: null,
      producerId: 0,
      retailerId: 0,
      type: null,
      year: null,
    },
    validate: {
      name: (value) => (value ? null : "'Name' is required"),
      price: (value) => (value ? null : "'Price' is required"),
      producerId: (value) => (value ? null : "'Wine producer' is required"),
      retailerId: (value) => (value ? null : "'Wine retailer' is required"),
    },
  });
  const Form = create ? CreateForm : EditForm;

  return (
    <Form saveButtonProps={saveButtonProps}>
      <TextInput mt="sm" label="Name" withAsterisk {...getInputProps("name")} />
      <NumberInput
        mt="sm"
        label="Price"
        placeholder="1...200000"
        min={0}
        withAsterisk
        {...getInputProps("price")}
      />
      <ProducerSelect
        mt="sm"
        data={[]}
        withAsterisk
        {...getInputProps("producerId")}
      />
      <WineTypeSelect
        mt="sm"
        data={[]}
        placeholder="Red/Rose/White/Other"
        withAsterisk
        {...getInputProps("type")}
      />
      <RetailerSelect
        mt="sm"
        data={[]}
        withAsterisk
        {...getInputProps("retailerId")}
      />
      <NumberInput
        mt="sm"
        label="Year"
        min={1900}
        max={2023}
        placeholder="1900...2023"
        withAsterisk
        {...getInputProps("year")}
      />
      {errors.content && (
        <Text id="content-error" mt={2} weight={500} size="xs" color="red">
          {errors.content}
        </Text>
      )}
    </Form>
  );
};

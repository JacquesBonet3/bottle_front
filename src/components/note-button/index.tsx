import React, { useState } from "react";
import { useWarnAboutChange, useCreate, useInvalidate } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import {
  Group,
  Button,
  Popover,
  ActionIcon,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { Icon123 } from "@tabler/icons";
import { DeleteButtonProps } from "@refinedev/mantine";

export const NoteButton: React.FC<DeleteButtonProps> = ({
  recordItemId,
  onSuccess,
  successNotification,
  errorNotification,
  dataProviderName,
  svgIconProps,
}) => {
  const { mutate } = useCreate();
  const [value, setValue] = useState<number | undefined>(undefined);
  const [comment, setComment] = useState<string | undefined>(undefined);

  const [opened, setOpened] = useState(false);
  const invalidate = useInvalidate();

  const onConfirm = () => {
    setWarnWhen(false);
    setOpened(false);
    mutate(
      {
        resource: "notes",
        successNotification,
        errorNotification,
        dataProviderName,
        values: {
          bottleId: recordItemId,
          expertId: 0,
          note: value,
          comment: comment,
        },
      },
      {
        onSuccess: (value) => {
          invalidate({
            resource: "bottles",
            id: recordItemId,
            invalidates: ["list"],
          });
          onSuccess && onSuccess(value);
        },
      }
    );
  };

  const { setWarnWhen } = useWarnAboutChange();

  return (
    <Popover opened={opened} onChange={setOpened} withArrow withinPortal>
      <Popover.Target>
        <ActionIcon
          onClick={() => setOpened((o) => !o)}
          data-testid={RefineButtonTestIds.EditButton}
          className={RefineButtonClassNames.EditButton}
          variant="outline"
        >
          <Icon123 size={18} {...svgIconProps} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown py="xs">
        <NumberInput
          mt="sm"
          placeholder="1...20"
          size="sm"
          min={0}
          max={20}
          value={value}
          onChange={setValue}
        />
        <TextInput
          mt="sm"
          placeholder="Comment"
          size="sm"
          min={0}
          max={20}
          value={comment}
          onChange={(event) => setComment(event.currentTarget.value)}
        />
        <Group position="center" noWrap spacing="xs" mt="xs">
          <Button onClick={() => setOpened(false)} variant="default" size="xs">
            Cancel
          </Button>
          <Button color="red" onClick={onConfirm} autoFocus size="xs">
            Note
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

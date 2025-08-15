import { Button } from "@/components/tiptap-ui-primitive/button";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import { handleFileUpload } from "@/lib/tiptap-utils";

export const FileUploadButton = () => {
  const { editor } = useTiptapEditor();

  const handleClick = () => {
    if (editor) {
      handleFileUpload(editor);
    }
  };

  return <Button onClick={handleClick}>Add File</Button>;
};

import { mergeAttributes, Node } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { FileUploadNode as FileUploadNodeComponent } from "@/components/tiptap-node/file-upload-node/file-upload-node";

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    fileUpload: {
      /**
       * Add a file upload node
       */
      setFileUpload: (options: {
        "data-file-id": string;
        "data-file-name": string;
        "data-file-size": string;
        "data-file-type": string;
      }) => ReturnType;
    };
  }
}

export const FileUploadNode = Node.create({
  name: "fileUpload",
  group: "block",
  atom: true,
  addAttributes() {
    return {
      "data-file-id": { default: null },
      "data-file-name": { default: null },
      "data-file-size": { default: null },
      "data-file-type": { default: null },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="file-upload"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "file-upload" }),
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(FileUploadNodeComponent);
  },
  addCommands() {
    return {
      setFileUpload:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

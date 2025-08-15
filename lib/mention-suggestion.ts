import { Editor, ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";

import { MentionList } from "@/components/tiptap-ui/mention-list";

interface SuggestionProps {
  editor: Editor;
  clientRect?: (() => DOMRect | null) | null;
}

interface SuggestionKeyDownProps {
  event: KeyboardEvent;
}

export const mentionSuggestion = {
  items: ({ query }: { query: string }) => {
    return [
      "Lea Thompson",
      "Cyndi Lauper",
      "Tom Cruise",
      "Madonna",
      "Jerry Hall",
      "Joan Collins",
      "Winona Ryder",
      "Christina Applegate",
      "Alyssa Milano",
      "Molly Ringwald",
      "Ally Sheedy",
      "Debbie Harry",
      "Olivia Newton-John",
      "Elton John",
      "Michael J. Fox",
      "Axl Rose",
      "Emilio Estevez",
      "Ralph Macchio",
      "Rob Lowe",
      "Jennifer Grey",
      "Mickey Rourke",
      "John Cusack",
      "Matthew Broderick",
      "Justine Bateman",
      "Lisa Bonet",
    ]
      .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 5);
  },

  render: () => {
    let component: ReactRenderer<any>;
    let popup: Instance[];

    return {
      onStart: (props: SuggestionProps) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy("body", {
          getReferenceClientRect: () => {
            const rect = props.clientRect?.();
            return rect || new DOMRect(0, 0, 0, 0);
          },
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props: SuggestionProps) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: () => {
            const rect = props.clientRect?.();
            return rect || new DOMRect(0, 0, 0, 0);
          },
        });
      },

      onKeyDown(props: SuggestionKeyDownProps) {
        if (props.event?.key === "Escape") {
          popup[0].hide();

          return true;
        }

        return component.ref?.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};

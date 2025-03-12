import { Node, mergeAttributes, RawCommands, CommandProps } from "@tiptap/core";

const SectionBreak = Node.create({
  name: "sectionBreak",

  group: "block",

  parseHTML() {
    return [
      {
        tag: "hr",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["hr", mergeAttributes(HTMLAttributes)];
  },

  addCommands(): Partial<
    RawCommands & { setSectionBreak: (props: CommandProps) => boolean }
  > {
    return {
      setSectionBreak: ({ commands }) => {
        return commands.insertContent("<hr>");
      },
    };
  },
});

export default SectionBreak;

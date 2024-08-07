import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export type InputFormProps = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

const InputForm = ({ name, setName }: InputFormProps): JSX.Element => {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-white capitalize"
      >
        {name}
      </label>
      {name == "title" ? (
        <Input
          type="text"
          id={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      ) : (
        <Textarea
          id={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      )}
    </>
  );
};

export default InputForm;

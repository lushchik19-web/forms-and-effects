import css from "./SearchForm.module.css";

interface SearchFormProps {
  onSearch: (topic: string) => Promise<void>;
}

function SearchForm({ onSearch }: SearchFormProps) {
  const handleSubmit = (formData: FormData) => {
    const topic = formData.get("topic") as string;

    if (topic) {
      onSearch(topic);
    }
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <input
        type="text"
        name="topic"
        placeholder="Search"
        className={css.input}
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;

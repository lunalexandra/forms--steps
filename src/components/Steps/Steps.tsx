import { useState } from "react";
import { NewRow } from "../NewRow/NewRow";

export interface IForm {
  date: string;
  distance: string;
}

export const Steps = () => {
  const [results, setResults] = useState<{ date: string; distance: number }[]>([]);

  const [form, setForm] = useState<IForm>({
    date: "",
    distance: "",
  });

  const { date, distance } = form;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year.slice(0, 2)}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { date: formatDate(date), distance: Number(distance) };

    if (!date || !distance || isNaN(Number(distance)) || Number(distance) < 0) {
      return;
    }

    setResults([...results, data]);

    setForm({ date: "", distance: "" });
  };

  const groupedResults = results.reduce<{ date: string; distance: number }[]>(
    (acc, curr) => {
      const existingEntry = acc.find((item) => item.date === curr.date);

      if (existingEntry) {
        existingEntry.distance += curr.distance;
      } else {
        acc.push({ date: curr.date, distance: curr.distance });
      }
      return acc;
    },
    []
  );

  const sortedResults = [...groupedResults].sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  });

  const removeResult = (date: string) => {
    setResults(results.filter((obj) => obj.date != date));
  };

  const editResult = (item: { date: string; distance: number }) => {
    const [day, month, year] = item.date.split('.');
    const formattedYear = year.length === 2 ? '20' + year : year;
    const formattedDate = `${formattedYear}-${month}-${day}`;
    setForm({
      date: formattedDate,
      distance: String(item.distance),
    });

    removeResult(item.date);
  };

  return (
    <div className="container">
      <form className="input-data" onSubmit={handleSubmit}>
        <div className="date-box item">
          <label htmlFor="input-date">Дата</label>
          <input
            type="date"
            name="date"
            id="input-date"
            value={date}
            onChange={handleChange}
          />
        </div>

        <div className="km-box item">
          <label htmlFor="input-distance">Пройдено км</label>
          <input
            type="text"
            name="distance"
            id="input-distance"
            value={distance}
            onChange={handleChange}
          />
        </div>

        <div className="button-box">
          <button type="submit" className="btn">
            Ok
          </button>
        </div>
      </form>

      <div className="title-box">
        <div>Дата(ДД.ММ.ГГ)</div>
        <div>Пройдено км</div>
        <div>Действия</div>
      </div>

      <div className="result">
        {sortedResults.map((result) => (
          <NewRow
            key={result.date}
            date={result.date}
            distance={result.distance}
            onEdit={() => editResult(result)}
            onDelete={() => removeResult(result.date)}
          />
        ))}
      </div>
    </div>
  );
};

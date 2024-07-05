import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { Parser } from "json2csv";

interface IProps<T> {
  data: T[];
  fields: string[];
  btnName: string | React.ReactNode;
  className?: string;
}

export default function DownloadCSV<T>({
  data,
  fields,
  btnName,
  className,
}: IProps<T>) {
  function handleDownload() {
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data.csv");
  }
  return (
    <Button
      type="button"
      className={className}
      onClick={handleDownload}
      variant={"default"}
    >
      {btnName}
    </Button>
  );
}

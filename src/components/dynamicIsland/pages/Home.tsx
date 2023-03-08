import Clock from "../../ui/Clock";

export default function HomePage() {
  return (
    <>
      <h1 className="text-6xl font-semibold">
        <Clock />
      </h1>
      <p className="ml-[3px]">
        {new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
          new Date()
        )}{" "}
        {new Date().getDate()}{" "}
        {new Intl.DateTimeFormat("en-US", { month: "short" }).format(
          new Date()
        )}
      </p>
    </>
  );
}

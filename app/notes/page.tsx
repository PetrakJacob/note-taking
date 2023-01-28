import Link from "next/link";
import CreateNote from "./CreateNote";
import styles from "./Notes.module.css";

async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/note/records?page=1&perPage=30",
    { cache: "no-cache" }
  );
  const data = await res.json();
  return data?.items as any[];
}

export default async function page() {
  const notes = await getNotes();

  return (
    <div>
      <h1>new notes</h1>
      <div className={styles.grid}>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>

      <CreateNote />
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};
  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2 className={styles.title}>{title}</h2>
        <h5 className={styles.content}>{content}</h5>
        <p className={styles.created}>{created}</p>
      </div>
    </Link>
  );
}

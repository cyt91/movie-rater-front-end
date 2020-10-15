import API from '../api-service';

export default function MovieForm(props) {
  const { movie } = props;
  const [title, setTitle] = useState(movie?.title || '');
  const [description, setDescription] = useState(movie?.description || '');

  const updateClicked = () => {
    API.updateMovie(movie.id, { title, description })
      .then((resp) => props.updatedMovie(resp))
      .catch((error) => console.error(error));
  };

  return (
    <>
      {movie ? (
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <br />
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            id="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <br />
            <button type="submit" onClick={updateClicked}>
              Update
            </button>
        </div>
      ) : null}
    </>
  );
}

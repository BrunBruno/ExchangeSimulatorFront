import classes from "./Content.module.scss";

function Content(props) {
  return (
    <div className={classes.content}>
      <h1>{props.option.title}</h1>
      <h2>Example piont</h2>
      <p>Example text.</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo nisi
        doloremque repellat aperiam laborum, iste totam vel, quas deleniti
        accusantium veritatis harum doloribus id! Id enim obcaecati voluptatem
        excepturi fugit!
      </p>
      <p>Example bullet list</p>
      <ul>
        <li>Poiny one</li>
        <li>Poiny two</li>
        <li>Poiny three</li>
      </ul>
      <h2>Some long text</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo nisi
        doloremque repellat aperiam laborum, iste totam vel, quas deleniti
        accusantium veritatis harum doloribus id! Id enim obcaecati voluptatem
        excepturi fugit! Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Explicabo nisi doloremque repellat aperiam laborum, iste totam
        vel, quas deleniti accusantium veritatis harum doloribus id! Id enim
        obcaecati voluptatem excepturi fugit! Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Explicabo nisi doloremque repellat aperiam
        laborum, iste totam vel, quas deleniti accusantium veritatis harum
        doloribus id! Id enim obcaecati voluptatem excepturi fugit! Lorem ipsum
        dolor sit amet, consectetur adipisicing elit. Explicabo nisi doloremque
        repellat aperiam laborum, iste totam vel, quas deleniti accusantium
        veritatis harum doloribus id! Id enim obcaecati voluptatem excepturi
        fugit! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Explicabo nisi doloremque repellat aperiam laborum, iste totam vel, quas
        deleniti accusantium veritatis harum doloribus id! Id enim obcaecati
        voluptatem excepturi fugit! Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Explicabo nisi doloremque repellat aperiam laborum,
        iste totam vel, quas deleniti accusantium veritatis harum doloribus id!
        Id enim obcaecati voluptatem excepturi fugit! Lorem ipsum dolor sit
        amet, consectetur adipisicing elit. Explicabo nisi doloremque repellat
        aperiam laborum, iste totam vel, quas deleniti accusantium veritatis
        harum doloribus id! Id enim obcaecati voluptatem excepturi fugit!
      </p>
    </div>
  );
}

export default Content;

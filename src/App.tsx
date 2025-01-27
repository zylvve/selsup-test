import React from "react";

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

type State = Model;

export class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = props.model;
  }

  getModel(): Model {
    return this.state;
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const id = +name;
    this.setState({
      paramValues: this.state.paramValues.map(paramValue =>
        paramValue.paramId === id ?
          {
            paramId: id,
            value,
          }
          :
          paramValue,
      ),
    })
  }

  render() {
    return (
      <form>
        {this.state.paramValues.map(paramValue => {
          const param = this.props.params.find(param => param.id === paramValue.paramId);
          if (!param) return (<></>);

          const { id, name, type } = param;
          return (
            <div key={paramValue.paramId}>
              <label style={{
                display: "grid",
                gridTemplateColumns: "10rem 10rem",
              }}>
                <span>{name}</span>
                {type === 'string' &&
                  <input type="text" name={id.toString()} value={paramValue.value} onChange={this.handleChange} />}
              </label>
            </div>
          )
        }
        )}
      </form>
    )
  }
}

export function App() {
  const paramEditorProps: Props = {
    params: [
      {
        id: 1,
        name: "Назначение",
        type: 'string',
      },
      {
        id: 2,
        name: "Длина",
        type: 'string',
      }
    ],
    model: {
      paramValues: [
        {
          paramId: 1,
          value: "повседневное",
        },
        {
          paramId: 2,
          value: "макси",
        },
      ]
    }
  }

  const [model, setModel] = React.useState<Model>();
  const paramEditorRef = React.createRef<ParamEditor>();
  const updateModel = () => {
    setModel(paramEditorRef.current?.getModel());
  }

  return (
    <>
      <ParamEditor {...paramEditorProps} ref={paramEditorRef} />

      { /* пример использования структуры, полученной методом getModel() */}
      <div>
        <button onClick={updateModel}>Вызов getModel()</button>
        <div>{JSON.stringify(model)}</div>
      </div>
    </>
  )
}
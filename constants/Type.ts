export type IWidth = {
    width: number;
  };
  
  export type IInput = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    onSubmitEditing: () => void;
    onBlur: () => void;
  };
  
  export type ITask = {
    id: number;
    content: string;
    ischecked: boolean;
    createdAt: string;
  };
  
  export type IIconButton = {
    type: any;
    id: number;
    onPressOut: (id: number) => void;
    ischecked: boolean;
  };
  
  export type ITaskComponent = {
    item: ITask;
    deleteTask: (id: number) => void;
    toggleTask: (id: number) => void;
    updateTask: (item: ITask) => void;
  };
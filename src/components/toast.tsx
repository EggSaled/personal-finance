import { useAppSelector, useAppDispatch } from '../app/hooks.ts';
import { clear } from '../app/messageSlice.ts';
import './toast.css';

export function Toast(){
  const message = useAppSelector(state => state.message);
  const dispatch = useAppDispatch();

  
  return (
    <div className={ message.message === "" ? "tooltip-hidden" : "tooltip" }>
      <div className="tooltip-body">
        <button onClick={ () => { dispatch(clear()); console.log(message); }}>X</button>
        <h6><i>{ message.isSuccessful ? "Success!" : "Error!" }</i></h6>
        <p>{ message.message }</p>
      </div>
    </div>
  );
}

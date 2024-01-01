import { MainOption } from './components/MainOption';
import { Schedules } from './components/Schedules';
import { Status } from './components/Status';

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <MainOption />
      <Status />
      <Schedules />
    </div>
  );
}

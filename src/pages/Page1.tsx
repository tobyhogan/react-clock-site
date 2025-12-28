import Clock from '../1-components-&-utilities/2-page-specific/1-page1/2-components/Component1';
import AnalogClock from '../1-components-&-utilities/2-page-specific/1-page1/2-components/Component2';

const Page1 = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Clock />
      <AnalogClock />
    </div>
  );
};

export default Page1;

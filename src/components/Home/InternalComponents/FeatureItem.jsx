// src/components/common/FeatureItem.jsx

const FeatureItem = ({ icon, title, description }) => (
  <li className="flex gap-8 items-center justify-between text-2xl font-light text-center xl:text-left font-[lato]">
    <img src={icon} alt={title} className="w-[100px] object-contain" loading="lazy" />
    <div className="text-left">
      <p className="font-[phenomena] text-3xl lg:text-5xl mb-2">{title}</p>
      <p className="text-lg">{description}</p>
    </div>
  </li>
);



export default FeatureItem;

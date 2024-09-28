import image from './image.png';

const AssetAlocation = () => {
    return (
        <div className="flex flex-col">
            Planilha de classes de ativos com percentual atual e percentual meta.
            <img className="w-full object-cover object-center" src={image} />
        </div>
    );
};

export default AssetAlocation;

import image from './image.png';
const AssetDetail = () => {
    return (
        <div>
            Tela para adicionar compra e venda de ativos, e calcular preço médio a partir disso. Ideia: criar um seletor
            de ativos para o usuário selecionar quais ativos quer editar. Os ativos selecionados apareceriam em uma
            lista, e o usuário poderia adicionar compra ou venda para cada um na mesma operação.
            <img src={image} />
        </div>
    );
};

export default AssetDetail;

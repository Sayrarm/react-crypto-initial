import {Layout, Select, Space, Button, Modal, Drawer} from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";
import {useEffect, useState} from "react";
import CoinInfoModal from "../CoinInfoModal.jsx";
import AddAssetForm from "../AddAssetForm.jsx";

const headerStyle = {
    width: "100%",
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export default function AppHeader() {
    const [select, setSelect] = useState(false)
    const [coin, setCoin] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const {crypto} = useCrypto()
    const [selectedValue, setSelectedValue] = useState("press / to open")

    useEffect(() => {
        const keypress = event => {
            if (event.key === '/') {
                setSelect((prev) => !prev)
            }
        }
        document.addEventListener("keypress", keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, [])

    function handleSelect(value, option) {
        setCoin(crypto.find(c => c.id === value))
        setSelectedValue(option.label)
        setSelect(false)
        showModal(true)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{width: '250px'}}
                open={select}
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                value={selectedValue}
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img
                            style={{width: 20}}
                            src={option.data.icon}
                            alt={option.data.label}/>
                        {' '}
                        {option.data.label}
                    </Space>
                )}
            />

            <Modal
                closable={{'aria-label': 'Custom Close Button'}}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <CoinInfoModal
                    coin={coin}
                />
            </Modal>

            <Button
                type="primary"
                onClick={() => setDrawer(true)}
            >
                Primary Button
            </Button>

            <Drawer
                size={600}
                title="Add Asset"
                closable={{'aria-label': 'Close Button'}}
                onClose={() => setDrawer(false)}
                open={drawer}
            >
                <AddAssetForm/>
            </Drawer>
        </Layout.Header>
    )
}
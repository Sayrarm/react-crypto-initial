import {Layout, Select, Space, Button} from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";
import {useEffect, useState} from "react";

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
    const { crypto } = useCrypto()
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
        console.log(value)
        setSelectedValue(option.label)
        setSelect(false)
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{width: '250px'}}
                open={select}
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                value={selectedValue}
                options={ crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                })) }
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

            <Button type="primary">Primary Button</Button>
        </Layout.Header>
    )
}
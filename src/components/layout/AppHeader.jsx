import {Layout, Select, Space, Button} from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";

const headerStyle = {
    width: "100%",
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const options = [
    {
        label: 'Happy',
        value: 'happy',
        emoji: '😄',
        desc: 'Feeling Good',
    },
    {
        label: 'Sad',
        value: 'sad',
        emoji: '😢',
        desc: 'Feeling Blue',
    },
    {
        label: 'Angry',
        value: 'angry',
        emoji: '😡',
        desc: 'Furious',
    },
    {
        label: 'Cool',
        value: 'cool',
        emoji: '😎',
        desc: 'Chilling',
    },
    {
        label: 'Sleepy',
        value: 'sleepy',
        emoji: '😴',
        desc: 'Need Sleep',
    },
];

export default function AppHeader() {
    const { crypto } = useCrypto()
    return (
        <Layout.Header style={headerStyle}>
            <Select
                mode="multiple"
                style={{width: '250px'}}
                placeholder="press / to open"
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
export function Credits() {
    return (
        <div>
            <div className="creditsMenu">
                <div className="discord">
                    <a href="https://discord.gg/hytale" target="_blank" rel="noopener noreferrer">
                        <img src="../src/assets/discord-logo.png" 
                            alt="Join our Discord Server" 
                            style={{ 
                                width: '100%', 
                                height: 'auto', 
                                cursor: 'pointer',
                                borderRadius: '8px'
                            }}/>
                    </a>
                    <a href="https://discord.gg/hytale" 
                        target="_blank" 
                        rel="noopener noreferrer">Discord!</a>
                </div>


                <div className="developers">
                        <textarea readOnly={true} value={"Macro Developer: ozakii."}></textarea>
                        <textarea readOnly={true} value={"Macro Developer: myeong.c"}></textarea>
                </div>
            </div>
        </div>
    )
}
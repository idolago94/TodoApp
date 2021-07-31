import React from "react";
import { View } from "react-native";
import ReactNativeSvgParser from '@target-corp/react-native-svg-parser'

type SVGIconProps = {
    source: String,
    width: Number,
    height: Number,
    fill?: String,
    style?: Object
}

const SVGIcon: React.FC<SVGIconProps> = ({ source, width, height, fill, style }) => {
    if (!source) return <View />

    const sourceFix = fill ? source.replace(/\b(\w*fill\w*)\b[=]["][#]?\b(\w*\w*)\b["]{1}/gm, `fill="${fill}"`) : source;
    return (
        <React.Fragment>
            <View style={style}>
                {ReactNativeSvgParser(sourceFix, '', { width: width || 92, height: height || 24 })}
            </View>
        </React.Fragment>
    )
}

export default SVGIcon
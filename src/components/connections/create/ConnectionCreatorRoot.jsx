import LogixPlcConnection from "./LogixPlcConnection";
import ModbusConnection from "./ModbusConnectionCreator";
import MqttConnection from "./MqttConnectionCreator";
import SparkplugBConnectionCreator from "./SparkplugBConnectionCreator";
import OpcUaConnectionCreator from "./OpcUaConnectionCreator";
import { useParams } from "react-router-dom";


export default function ConnectionCreatorRoot({connectionType}) {

  return (
    <div>
        {connectionType === "MQTT" && <MqttConnection />}
        {connectionType === "OPC-UA" && <OpcUaConnectionCreator />}
        {connectionType === "Logix PLC" && <LogixPlcConnection />}
        {connectionType === "Sparkplug-B" && <SparkplugBConnectionCreator />}
        {connectionType === "Modbus" && <ModbusConnection />}
    </div>
  );
}

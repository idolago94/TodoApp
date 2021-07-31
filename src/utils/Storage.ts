import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskProps } from '../components/Task';

class Storage {
  async getTasks(userId: string) {
    try {
      const userTasks = await AsyncStorage.getItem(userId)
      if (userTasks !== null) return JSON.parse(userTasks)
      return []
    } catch (e) {
      console.log("Storage -> getTasks -> e", e)
    }
  }

  async setTasks(userId: string, tasks: TaskProps[]) {
    try {
      await AsyncStorage.setItem(userId, JSON.stringify(tasks))
    } catch (e) {
      console.log("Storage -> setTasks -> e", e)
    }
  }
}

export default new Storage()
import React, { useState } from "react";
import {
  Container,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Checkbox,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const toast = useToast();

  const addTask = () => {
    if (!task) {
      toast({
        title: "Task cannot be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} w="100%">
        <HStack w="100%">
          <Input
            placeholder="Enter a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button onClick={addTask} colorScheme="teal">
            Add Task
          </Button>
        </HStack>
        <VStack w="100%" spacing={3}>
          {tasks.map((t, index) => (
            <HStack key={index} w="100%" justifyContent="space-between">
              <Checkbox
                isChecked={t.completed}
                onChange={() => toggleTaskCompletion(index)}
              >
                <Text as={t.completed ? "s" : undefined}>{t.text}</Text>
              </Checkbox>
              <IconButton
                aria-label="Delete task"
                icon={<FaTrash />}
                onClick={() => deleteTask(index)}
              />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
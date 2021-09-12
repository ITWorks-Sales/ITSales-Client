import { Edge, Flow, ILIUser, InmailNode, QueueNode } from '../types';
import { AxiosResponse } from 'axios';
import axios from '../.';

import { CreateNodeDTO } from './dto/create-node.dto';
import { CreateEdgeDTO } from './dto/create-edge.dto';
import { CreateFlowDTO } from './dto/create-flow.dto';
import { UpdateFlowDTO } from './dto/update-flow.dto';
import { UpdateNodesDTO } from './dto/update-nodes.dto';
import { UpdateEdgeDTO } from './dto/update-edge.dto';
import { DeleteEdgesDTO } from './dto/delete-edges.dto';
import { DeleteNodesDTO } from './dto/delete-nodes.dto';
import { updateNodesFieldsDTO } from './dto/update-nodes-fields.dto';
import { UpdateNodesUsersDTO } from './dto/update-users-nodes.dto';

export function getAllFlows(): Promise<AxiosResponse<Flow[]>> {
  return axios.get<Flow[]>('/flows', { params: { id: 0 } });
}

export function getFlowById(id: number): Promise<AxiosResponse<Flow>> {
  return axios.get<Flow>('/flows', { params: { id } });
}

export function createFlow(createFlowDto: CreateFlowDTO) {
  return axios.post<Flow>(`/flows`, createFlowDto);
}

export function updateFlow(updateFlowDto: UpdateFlowDTO) {
  return axios.put<Flow>(`/flows`, updateFlowDto);
}

export function createNode(createNodeDto: CreateNodeDTO) {
  return axios.post<InmailNode | QueueNode>(`/flows/node`, createNodeDto);
}

export function updateNodesLocation(updateNodesDto: UpdateNodesDTO) {
  return axios.put<void>(`/flows/node/position`, updateNodesDto);
}

export function updateNodesUsers(updateObject: UpdateNodesUsersDTO) {
  return axios.put<void>('/flows/node/users', updateObject);
}

export function updateNodesFields(updateNodesFieldsDto: updateNodesFieldsDTO) {
  return axios.put<void>(`/flows/node/fields`, updateNodesFieldsDto);
}

export function deleteNodes(deleteNodesDto: DeleteNodesDTO) {
  return axios.delete<void>(`/flows/node`, { data: deleteNodesDto });
}

export function createEdge(createEdgeDto: CreateEdgeDTO) {
  return axios.post<Edge>(`/flows/edge`, createEdgeDto);
}

export function updateEdge(updateEdgeDto: UpdateEdgeDTO) {
  return axios.put<Edge>(`/flows/edge`, updateEdgeDto);
}

export function deleteEdges(deleteEdgesDto: DeleteEdgesDTO) {
  return axios.delete<void>(`/flows/edge`, { data: deleteEdgesDto });
}

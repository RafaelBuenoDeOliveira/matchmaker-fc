import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export default function PainelMaster() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const buscarUsuarios = async () => {
    const { data } = await supabase.from('perfis').select('*').order('created_at', { ascending: false });
    if (data) setUsuarios(data);
  };

  const alterarNivel = async (id, novoNivel) => {
    await supabase.from('perfis').update({ nivel_acesso: novoNivel }).eq('id', id);
    buscarUsuarios(); // Recarrega a lista para mostrar a alteração
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-800">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">⚙️ Painel de Administração Master</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Gestão de Permissões (Membros do Ressaca FC)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border-b">Nome</th>
                <th className="p-3 border-b">E-mail</th>
                <th className="p-3 border-b">Cargo Atual</th>
                <th className="p-3 border-b">Ação</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{user.nome}</td>
                  <td className="p-3 text-gray-600">{user.email}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded uppercase font-bold ${
                      user.nivel_acesso === 'master' ? 'bg-purple-100 text-purple-800' :
                      user.nivel_acesso === 'admin' ? 'bg-green-100 text-green-800' :
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {user.nivel_acesso}
                    </span>
                  </td>
                  <td className="p-3">
                    <select 
                      value={user.nivel_acesso} 
                      onChange={(e) => alterarNivel(user.id, e.target.value)}
                      className="border rounded p-1 text-sm bg-white cursor-pointer"
                    >
                      <option value="mensalista">Mensalista</option>
                      <option value="admin">Admin</option>
                      <option value="master">Master</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Parâmetros e Habilidades (Em Breve)</h3>
        <p className="text-gray-500 text-sm">Aqui iremos construir a interface para você adicionar novas métricas, ajustar o peso de cada habilidade ou alterar as regras do algoritmo de sorteio.</p>
      </div>
    </div>
  );
}
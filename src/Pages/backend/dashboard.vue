<template>
  <div class="dashboard">
    <h2>User Dashboard</h2>

    <table border="1" cellpadding="8">
      <thead>
        <tr>
          <th>No</th>
          <th>Full Name</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td v-if="editId !== user.id">{{ user.fname }} {{ user.lname }}</td>
          <td v-else>
            <input type="text" v-model="editForm.fname" placeholder="First Name" />
            <input type="text" v-model="editForm.lname" placeholder="Last Name" />
          </td>
          <td v-if="editId !== user.id">{{ user.username }}</td>
          <td v-else>
            <input type="text" v-model="editForm.username" placeholder="Username" />
          </td>
          <td>
            <button v-if="editId !== user.id" @click="startEdit(user)">Edit</button>
            <button v-else @click="saveEdit(user.id)">Save</button>
            <button v-if="editId === user.id" @click="cancelEdit">Cancel</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);
const editId = ref(null);
const editForm = ref({ fname: '', lname: '', username: '' });

const fetchUsers = async () => {
  try {
    const res = await fetch('http://localhost:3000/users');
    if (!res.ok) throw new Error("Failed to fetch users");
    users.value = await res.json();
  } catch (err) {
    console.error(err);
    alert("ไม่สามารถโหลดข้อมูลผู้ใช้ได้ ❌");
  }
};

const startEdit = (user) => {
  editId.value = user.id;
  editForm.value = { ...user };
};

const cancelEdit = () => {
  editId.value = null;
  editForm.value = { fname: '', lname: '', username: '' };
};

const saveEdit = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm.value),
    });
    if (!res.ok) throw new Error("Failed to update user");
    alert("แก้ไขข้อมูลสำเร็จ ✅");
    editId.value = null;
    fetchUsers();
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดในการแก้ไข ❌");
  }
};

const deleteUser = async (id) => {
  if (confirm('คุณต้องการลบ user นี้ใช่หรือไม่?')) {
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Failed to delete user");
      alert("ลบผู้ใช้เรียบร้อย ✅");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการลบ ❌");
    }
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
.dashboard {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

thead {
  background-color: #1658f1;
  color: white;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

tr:hover {
  background-color: #f0f8ff; /* อ่านง่ายขึ้น */
}

button {
  margin: 0 4px;
  padding: 6px 10px;
  background-color: #3498db;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #2980b9;
}

input[type="text"] {
  padding: 6px 10px;
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 6px;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 10px;
  }

  table, thead, tbody, th, td, tr {
    display: block;
  }

  th {
    display: none;
  }

  td {
    position: relative;
    padding-left: 50%;
    text-align: right;
  }

  td::before {
    position: absolute;
    left: 10px;
    top: 12px;
    white-space: nowrap;
    font-weight: bold;
    color: #555;
  }

  td:nth-of-type(1)::before { content: "#"; }
  td:nth-of-type(2)::before { content: "Full Name"; }
  td:nth-of-type(3)::before { content: "Username"; }
  td:nth-of-type(4)::before { content: "Actions"; }
}
</style>

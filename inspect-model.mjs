// Quick Three.js based GLB inspector
import { readFileSync } from 'fs';

// We'll parse the GLB manually to find mesh/node names
const buffer = readFileSync('./public/models/java-transformed.glb');

// GLB header: magic(4) + version(4) + length(4) = 12 bytes
// Then chunks: chunkLength(4) + chunkType(4) + chunkData(chunkLength)
const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);

let offset = 12; // skip header

// First chunk should be JSON
const jsonLength = view.getUint32(offset, true);
const jsonType = view.getUint32(offset + 4, true);
offset += 8;

const jsonStr = buffer.slice(offset, offset + jsonLength).toString('utf8');
const gltf = JSON.parse(jsonStr);

console.log('\n=== NODES ===');
if (gltf.nodes) {
  gltf.nodes.forEach((node, i) => {
    console.log(`Node ${i}: name="${node.name || 'unnamed'}", mesh=${node.mesh ?? 'none'}, translation=${JSON.stringify(node.translation)}`);
  });
}

console.log('\n=== MESHES ===');
if (gltf.meshes) {
  gltf.meshes.forEach((mesh, i) => {
    console.log(`Mesh ${i}: name="${mesh.name || 'unnamed'}"`);
    mesh.primitives.forEach((prim, j) => {
      console.log(`  Primitive ${j}: material=${prim.material ?? 'none'}`);
    });
  });
}

console.log('\n=== MATERIALS ===');
if (gltf.materials) {
  gltf.materials.forEach((mat, i) => {
    const ext = mat.extensions?.KHR_materials_pbrSpecularGlossiness;
    const pbr = mat.pbrMetallicRoughness;
    console.log(`Material ${i}: name="${mat.name || 'unnamed'}"`);
    if (ext) {
      console.log(`  specGloss diffuse: [${ext.diffuseFactor?.map(v => v.toFixed(3)).join(', ')}]`);
      console.log(`  specGloss specular: [${ext.specularFactor?.map(v => v.toFixed(3)).join(', ')}]`);
    }
    if (pbr) {
      console.log(`  pbr baseColor: [${pbr.baseColorFactor?.map(v => v.toFixed(3)).join(', ')}]`);
    }
  });
}

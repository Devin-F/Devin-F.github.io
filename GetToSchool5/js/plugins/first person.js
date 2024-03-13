// =============================================================================
// First Person Camera Plugin
// by Sunri
// Version: 1.2.1
// License: MIT
// =============================================================================

/*:
@target MZ
@plugindesc A plugin that allows for a first-person camera view in RPG Maker MZ.
@help This plugin allows for a first-person camera view in RPG Maker MZ.
The first-person camera view will always be enabled when this plugin is active.

@param cameraX
@text Camera X Position
@type number
@desc The X position of the camera relative to the player. Default: -0.5.
@default -0.5

@param cameraY
@text Camera Y Position
@type number
@desc The Y position of the camera relative to the player. Default: 1.
@default 1

@param cameraZ
@text Camera Z Position
@type number
@desc The Z position of the camera relative to the player. Default: 1.
@default 1

@param cameraRotationX
@text Camera X Rotation
@type number
@desc The X rotation of the camera relative to the player. Default: -20.
@default -20

@param cameraRotationY
@text Camera Y Rotation
@type number
@desc The Y rotation of the camera relative to the player. Default: 180.
@default 180

@param cameraRotationZ
@text Camera Z Rotation
@type number
@desc The Z rotation of the camera relative to the player. Default: 0.
@default 0
*/

(function() {
var parameters = PluginManager.parameters('FirstPersonCameraPlugin');
var cameraPosition = { x: Number(parameters['cameraX']), y: Number(parameters['cameraY']), z: Number(parameters['cameraZ']) };
var cameraRotation = { x: Number(parameters['cameraRotationX']), y: Number(parameters['cameraRotationY']), z: Number(parameters['cameraRotationZ']) };

var _Spriteset_Base_createPictures = Spriteset_Base.prototype.createPictures;
Spriteset_Base.prototype.createPictures = function() {
_Spriteset_Base_createPictures.call(this);
this._cameraContainer = new PIXI.Container();
this._pictureContainer.addChild(this._cameraContainer);
};

var _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
_Scene_Map_update.call(this);

var playerX = $gamePlayer.x;
var playerY = $gamePlayer.y;
var playerZ = $gamePlayer.z;

cameraPosition.x = playerX + Number(parameters['cameraX']);
cameraPosition.y = playerY + Number(parameters['cameraY']);
cameraPosition.z = playerZ + Number(parameters['cameraZ']);

cameraRotation.x = Number(parameters['cameraRotationX']);
cameraRotation.y = Number(parameters['cameraRotationY']);
cameraRotation.z = Number(parameters['cameraRotationZ']);

if (this._pictureContainer && this._pictureContainer._baseSprite && this._cameraContainer) {
if (!this._pictureContainer.contains(this._cameraContainer)) {
this._pictureContainer.addChild(this._cameraContainer);
}
this._cameraContainer.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
this._cameraContainer.rotation.set(cameraRotation.x * Math.PI / 180, cameraRotation.y * Math.PI / 180, cameraRotation.z * Math.PI / 180);
}
};
})();
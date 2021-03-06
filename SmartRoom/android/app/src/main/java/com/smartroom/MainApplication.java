package com.smartroom;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.wix.reactnativenotifications.RNNotificationsPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.brentvatne.react.ReactVideoPackage;
import org.wonday.orientation.OrientationPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.guichaguri.trackplayer.TrackPlayer;
import com.tanguyantoine.react.MusicControl;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.cinder92.musicfiles.RNReactNativeGetMusicFilesPackage;
import com.polidea.reactnativeble.BlePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNNotificationsPackage(),
            new ReactNativePushNotificationPackage(),
            new ReactVideoPackage(),
            new OrientationPackage(),
            new ReactNativeConfigPackage(),
            new VectorIconsPackage(),
            new TrackPlayer(),
            new MusicControl(),
            new ReactNativeAudioPackage(),
            new RNReactNativeGetMusicFilesPackage(),
            new BlePackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
